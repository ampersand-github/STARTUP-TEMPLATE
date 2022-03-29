import { ISampleRepository } from '../../domain/user/sample-repository-interface';
import { PrismaService } from '../prisma/prisma.service';
import { UserId } from '../../domain/user/sample-id';
import { ISample, Sample } from '../../domain/user/sample';

export class MockSampleRepository implements ISampleRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  findAll(): Promise<Sample[]> {
    return Promise.resolve([sample1, sample2, sample3]);
  }

  findOne(id: UserId): Promise<Sample> {
    return Promise.resolve(sample1);
  }

  delete(id: UserId): Promise<void> {
    return Promise.resolve(undefined);
  }

  register(entity: Sample): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Sample): Promise<void> {
    return Promise.resolve(undefined);
  }
}

const sampleId1 = UserId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
const props1: ISample = { name: '田中太郎', description: '長男' };
const sample1 = Sample.reBuild(props1, sampleId1);
const sampleId2 = UserId.reBuild('6c2faf45-8fae-48ad-e660-c5d1c92920c2');
const props2: ISample = { name: '田中二郎', description: '次男' };
const sample2 = Sample.reBuild(props2, sampleId2);
const sampleId3 = UserId.reBuild('6c2faf45-8fae-48ad-e660-c5d1c92920c2');
const props3: ISample = { name: '田中三郎', description: '三男' };
const sample3 = Sample.reBuild(props3, sampleId3);
