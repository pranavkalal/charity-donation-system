import CampaignFilterStrategy from './CampaignFilterStrategy';

export default class FilterByGoalAmount extends CampaignFilterStrategy {
  constructor(minGoalAmount) {
    super();
    this.minGoalAmount = minGoalAmount;
  }

  apply(campaigns) {
    if (!this.minGoalAmount) return campaigns;
    return campaigns.filter(c => c.goalAmount >= this.minGoalAmount);
  }
}
