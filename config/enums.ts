// 频道预设限制的枚举
export enum ChannelLimits {
  BasicPlanChannels = 10,
  EnterprisePlanChannels = 50,
}

export enum PriceSettings {
  BasicPlanPrice = 7,
  EnterprisePlanPrice = 35,
}

// 计划类型的枚举
export enum PlanType {
  Basic = "basic plan",
  Enterprise = "enterprise plan",
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
