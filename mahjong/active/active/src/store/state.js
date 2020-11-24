const state={
    start:'-1', //0->start页  1->进入页  2->结束页  3->活动详情
    prizeType:'-1',//5->获取翻牌次数 8->麻将排行
        // 6-1->赠送麻将w  6-2->赠送麻将t  6-3->赠送麻将s     7-1->索取麻将w  7-2->索取麻将t  7-3->索取麻将s
        // 4->part 3->bronze 2->silver 1->gold 0->special
        // 4-1->兑换part详情  3-1->兑换bronze详情  2-1->兑换silver详情  1-1->兑换gold详情  0-1->兑换special详情
        // 4-0->兑换part成功  3-0->兑换bronze成功  2-0->兑换silver成功  1-0->兑换gold成功  0-0->兑换special成功
    loginInfo:{},
}

export default state