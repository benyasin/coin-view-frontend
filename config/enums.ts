// 频道预设限制的枚举
export enum ChannelLimits {
  BasicPlanChannels = 10,
  EnterprisePlanChannels = 50,
}

export enum PriceSettings {
  BasicPlanPrice = 5,
  EnterprisePlanPrice = 25,
}

// 计划类型的枚举
export enum PlanType {
  Basic = "basic_plan",
  Enterprise = "enterprise_plan",
}

// 你还可以定义一个函数，基于计划类型获取预设的频道限制
export const getChannelLimit = (plan: string): number => {
  switch (plan) {
    case PlanType.Basic:
      return ChannelLimits.BasicPlanChannels;
    case PlanType.Enterprise:
      return ChannelLimits.EnterprisePlanChannels;
    default:
      return 0;
  }
};

export const getPaymentPlan = (plan: string): number => {
  switch (plan) {
    case PlanType.Basic:
      return PriceSettings.BasicPlanPrice;
    case PlanType.Enterprise:
      return PriceSettings.EnterprisePlanPrice;
    default:
      return 0;
  }
};
