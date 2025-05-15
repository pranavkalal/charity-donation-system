import CampaignFilterStrategy from './CampaignFilterStrategy';

export default class FilterByStatus extends CampaignFilterStrategy {
  constructor(status) {
    super();
    this.status = status;
  }

  apply(campaigns) {
    if (!this.status) return campaigns;
    return campaigns.filter(c => c.status === this.status);
  }
}
