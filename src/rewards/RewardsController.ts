import { Controller, Get, PathParams } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { AirdropMerkleClaim, RewardMerkleClaim } from '../interface/MerkleDistribution';
import { RewardService } from './RewardsService';

@Controller('/reward')
export class RewardController {
  constructor(private rewardService: RewardService) {}

  @ContentType('json')
  @Get('/gitcoin/:address')
  async getGitcoinAirdropClaim(@PathParams('address') address: string): Promise<AirdropMerkleClaim> {
    return this.rewardService.getUserAirdrop('gitcoin-airdrop.json', address);
  }

  @ContentType('json')
  @Get('/tree/:address')
  async getBadgerTreeReward(@PathParams('address') address: string): Promise<RewardMerkleClaim> {
    return this.rewardService.getUserRewards(address);
  }
}
