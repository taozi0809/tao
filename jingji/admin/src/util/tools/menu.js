export const menuOptions = [
    {
        Type:1,
        Name:"用户列表",
        url:null,
        Power:[
            {
                Type:1,
                Name:"用户列表",
                url:"/user/list",
            },
            {
                Type:2,
                Name:"白名单",
                url:"/user/whitelist",
            }
        ],
    },
    {
        Type:2,
        Name:"多人赛事",
        url:null,
        Power:[
            {
                Type:1,
                Name:"赛事列表",
                url:"/race/list",
            },
            {
                Type:2,
                Name:"赛事详情",
                url:"/race/details",
            },
            {
                Type:3,
                Name:"赛事盈亏",
                url:"/race/profit",
            },
            {
                Type:4,
                Name:"比赛获得",
                url:"/race/competition",
            },
            {
                Type:5,
                Name:"大师分查询",
                url:"/race/master",
            },
            {
                Type:6,
                Name:"异常赛事回调",
                url:"/race/abnormal",
            },
        ],
    },
    {
        Type:3,
        Name:"多支付通道",
        url:null,
        Power:[
            {
                Type:1,
                Name:"商城支付",
                url:"/payment/mall",
            },
            {
                Type:2,
                Name:"奖金提现",
                url:"/payment/bonus",
            },
            {
                Type:3,
                Name:"支付记录",
                url:"/payment/recording",
            },
            {
                Type:4,
                Name:"线下支付",
                url:"/payment/offline",
            },
        ],
    },
    {
        Type:4,
        Name:"大厅功能",
        url:null,
        Power:[
            {
                Type:1,
                Name:"邮件系统",
                url:"/hall/email",
            },
            {
                Type:2,
                Name:"活动",
                url:"/hall/active",
            },
            {
                Type:3,
                Name:"公告",
                url:"/hall/bulletin",
            },
            {
                Type:4,
                Name:"每日福利",
                url:"/hall/welfare",
            },
            {
                Type:5,
                Name:"道具配置",
                url:"/hall/props",
            },
            {
                Type:6,
                Name:"分享有奖",
                url:"/hall/share",
            },
            {
                Type:7,
                Name:"跑马灯",
                url:"/hall/marquee",
            },
        ],
    },
    {
        Type:5,
        Name:"财务报表",
        url:null,
        Power:[
            {
                Type:1,
                Name:"财务总览",
                url:"/finance/overview",
            },
            {
                Type:2,
                Name:"充值明细",
                url:"/finance/recharge",
            },
            {
                Type:3,
                Name:"提现明细",
                url:"/finance/withdraw",
            },
            {
                Type:4,
                Name:"赛事奖金总览界面",
                url:"/finance/bonus",
            },
        ],
    },
    {
        Type:6,
        Name:"数据报表",
        url:null,
        Power:[
            {
                Type:1,
                Name:"数据分析",
                url:"/data/analysis",
            },
            {
                Type:2,
                Name:"用户分析",
                url:"/data/user",
            },
            {
                Type:3,
                Name:"新增用户分析",
                url:"/data/userAdd",
            },
            {
                Type:4,
                Name:"赛事分析",
                url:"/data/match",
            },
            {
                Type:5,
                Name:"充值额度分析",
                url:"/data/recharge",
            },
            {
                Type:6,
                Name:"点券余额分析",
                url:"/data/balance",
            },
            {
                Type:7,
                Name:"用户使用点券分析",
                url:"/data/couponUse",
            },
            {
                Type:8,
                Name:"奖金获得分析",
                url:"/data/bonusGet",
            },
        ],
    },
    {
        Type:7,
        Name:"机器人设置",
        url:null,
        Power:[
            {
                Type:1,
                Name:"配置列表",
                url:"/robot/configuration",
            },
        ],
    },
    {
        Type:8,
        Name:"系统设置",
        url:null,
        Power:[
            {
                Type:1,
                Name:"更新提示",
                url:"/set",
            },
            {
                Type:2,
                Name:"玩家反馈",
                url:"/feedback",
            },
            {
                Type:3,
                Name:"系统账号列表",
                url:"/sysAccount",
            },
        ],
    },
]
