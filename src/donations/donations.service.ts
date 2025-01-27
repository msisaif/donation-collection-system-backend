import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entity/donation.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationsRepository: Repository<Donation>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    try {
      const donation = this.donationsRepository.create(createDonationDto);
      return this.donationsRepository.save(donation);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async findAll(): Promise<Donation[]> {
    return this.donationsRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findAllTrash(): Promise<Donation[]> {
    return this.donationsRepository.find({
      order: { id: 'DESC' },
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }

  async findOne(id: number): Promise<Donation | null> {
    return this.donationsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation | null> {
    await this.donationsRepository.update(id, updateDonationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.donationsRepository.softDelete(id);
      return { message: 'Donation has been soft deleted' };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async restore(id: number): Promise<{ message: string }> {
    try {
      await this.donationsRepository.restore(id);
      return { message: 'Donation has been restored' };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
