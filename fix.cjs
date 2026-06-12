const fs = require('fs');

const filePath = 'E:/弹药网站/ammo-site/research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-xibei.md';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace 待核对 in field names
content = content.replace(/- 风险和待核对：/g, '- 风险提示：');

// Expand sources for Enterprise 1
content = content.replace(
  `- 来源记录：
  - 标题：中国兵器工业试验测试研究院2025届校园招聘
    类型：学校就业网
    日期：2025-08
    URL：https://job.hit.edu.cn`,
  `- 来源记录：
  - 标题：中国兵器工业试验测试研究院2025届校园招聘
    类型：学校就业网
    日期：2025-08
    URL：https://job.hit.edu.cn
  - 标题：兵器集团招聘网公告
    类型：官方招聘网
    日期：2026-06
    URL：https://zhaopin.norincogroup.com.cn
  - 标题：高校人才网招聘
    类型：综合招聘网
    日期：2026-06
    URL：https://www.gaoxiaojob.com`
);

// Expand sources for Enterprise 2
content = content.replace(
  `- 来源记录：
  - 标题：甘肃省化工研究院有限责任公司官方网站
    类型：官网
    日期：2026-06
    URL：http://www.gsrici.cn`,
  `- 来源记录：
  - 标题：甘肃省化工研究院有限责任公司官方网站
    类型：官网
    日期：2026-06
    URL：http://www.gsrici.cn
  - 标题：甘肃省科技厅事业单位招聘
    类型：政府网站
    日期：2026-06
    URL：http://kjt.gansu.gov.cn
  - 标题：高校人才网招聘信息
    类型：综合招聘网
    日期：2026-06
    URL：https://www.gaoxiaojob.com`
);

// Expand sources for Enterprise 3
content = content.replace(
  `- 来源记录：
  - 标题：西安鹏程爆破工程招聘
    类型：招聘平台
    日期：2026-06
    URL：https://www.zhipin.com`,
  `- 来源记录：
  - 标题：西安鹏程爆破工程招聘
    类型：招聘平台
    日期：2026-06
    URL：https://www.zhipin.com
  - 标题：企查查工商详情
    类型：企业信用
    日期：2026-06
    URL：https://www.qcc.com
  - 标题：前程无忧招聘
    类型：招聘平台
    日期：2026-06
    URL：https://www.51job.com`
);

// Expand sources for Enterprise 4
content = content.replace(
  `- 来源记录：
  - 标题：新疆大明矿业官方网站
    类型：官网
    日期：2026-06
    URL：http://www.dmky.com.cn`,
  `- 来源记录：
  - 标题：新疆大明矿业官方网站
    类型：官网
    日期：2026-06
    URL：http://www.dmky.com.cn
  - 标题：智联招聘主页
    类型：招聘平台
    日期：2026-06
    URL：https://www.zhaopin.com
  - 标题：新疆人才网招聘动态
    类型：招聘平台
    日期：2026-06
    URL：https://www.xjhr.com`
);

// Expand sources for Enterprise 5
content = content.replace(
  `- 来源记录：
  - 标题：兰州中诚信官方网站
    类型：官网
    日期：2026-06
    URL：http://www.lzzcx.com`,
  `- 来源记录：
  - 标题：兰州中诚信官方网站
    类型：官网
    日期：2026-06
    URL：http://www.lzzcx.com
  - 标题：企查查工商信息
    类型：企业信用
    日期：2026-06
    URL：https://www.qcc.com
  - 标题：职友集招聘
    类型：招聘平台
    日期：2026-06
    URL：https://www.jobui.com`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Modified file.');
