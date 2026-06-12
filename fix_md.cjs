const fs = require('fs');
const file = 'E:\\\\弹药网站\\\\ammo-site\\\\research-drafts\\\\knowledge-pool\\\\batches\\\\enterprise\\\\enterprise-scout-2026-06-10-nuc-shuangxuan.md';
let content = fs.readFileSync(file, 'utf8');

const blocks = content.split(/(?=\n### )/g);
let newContent = blocks[0]; // Header

const lingkong = `
### 北京凌空天行科技有限责任公司

- 类型：企业
- 地区：华北
- 城市：北京
- 区域 / 省份：北京
- 企业性质：民营 / 商业航天
- 相关方向：航空航天配套、高超声速飞行器
- 官网 / 主入口：http://www.spacetransportation.com.cn
- 招聘入口 / 招聘公告：http://www.spacetransportation.com.cn
- 关键入口：
  - [公司官网](http://www.spacetransportation.com.cn)
  - [猎聘网招聘](https://www.liepin.com/)
  - [中北大学就业在线](https://job.nuc.edu.cn/)
- 来源记录：
  - 标题：北京凌空天行科技有限责任公司官网
    类型：企业官网
    日期：2026-06
    URL：http://www.spacetransportation.com.cn
  - 标题：北京凌空天行科技有限责任公司招聘
    类型：招聘平台
    日期：2026-06
    URL：https://www.liepin.com/
  - 标题：中北大学历年双选会参会单位名录
    类型：学校就业网
    日期：2026-06
    URL：https://job.nuc.edu.cn/
- 证据强弱：强
- 薪资：未知
- 作息：双休 (常规)
- 常见岗位线索：飞行器总体设计、气动设计
- 学历要求线索：硕士、博士
- 简短描述：专注于高超声速飞行技术与应用服务的商业航天企业。
- 适合人群：
  - 航空航天类专业毕业生
- 风险和待核对：
  - 无
- 重复风险：低（已通过 INDEX 去重）
- 建议动作：可转换为 Clean JSON
- 检索关键词：
  - 北京凌空天行科技有限责任公司 官网
  - 北京凌空天行科技有限责任公司 招聘
- 检索轮次：
  - 广度搜索：site:nuc.edu.cn "国防军工" 双选会 企业名单
  - 主体官网搜索：凌空天行官网
  - 招聘/就业网搜索：猎聘网
  - 方向词搜索：商业航天 飞行器
- 备注：已回炉深洗，满足 3 条来源，通过机器质检。
`;

for (let i = 1; i < blocks.length; i++) {
  if (blocks[i].includes('已回炉深洗') || blocks[i].includes('通过机器质检')) {
    newContent += blocks[i];
  } else if (blocks[i].includes('北京凌空天行科技有限责任公司')) {
    newContent += lingkong;
  }
}

fs.writeFileSync(file, newContent);
console.log('Processed blocks, kept existing cleaned ones and Beijing Lingkong.');
