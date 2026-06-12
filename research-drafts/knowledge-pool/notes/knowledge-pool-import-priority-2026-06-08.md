# 2026-06-08 知识库候选入库优先队列

用途：给当前入库/收口会话挑 clean 对象用。

边界：本文件只整理候选优先级，不正式入库，不修改 `src/data/companies.ts`，不修改 `src/data/universities.ts`，不改页面，不碰服务器/VPS/域名。

当前正式状态：企业 50 家，院校 32 所。batch10/batch11 链接审计已完成，id 41-50 共 50 个入口复扫坏链 0；正式库检查、build、qa:routes 均通过。

口径提醒：薪资、作息、岗位细节、招生人数、分数线、就业率都不在本文件写死；后续清洗时只把强/中证据能支撑的内容写入 clean JSON。

## 企业优先 10 条

| 名称 | 类型 | 优先级 | 为什么适合下一批 | 主要入口链接 | 重复风险 | 建议动作 |
| --- | --- | --- | --- | --- | --- | --- |
| 浙江新联民爆集团股份有限公司 | 企业 | P1 | 学校就业网证据强，明确出现弹药工程与爆炸技术、安全工程等专业优先线索，适合快速清洗。 | https://scbe.aust.edu.cn/info/1143/7777.htm<br>http://www.zjxlmb.com/ | 低。正式 50 家暂无该主体。 | 优先生成 clean JSON；岗位、地点、待遇只按历史招聘样本或待核对处理。 |
| 江西国科军工集团股份有限公司 | 企业 | P1 | 上市披露和招聘线索都较强，方向覆盖弹药装备、引信、固体火箭发动机、火工装备。 | https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=9294673&stockid=688543<br>https://static.sse.com.cn/stock/disclosure/announcement/c/202209/001204_20220909_2YQK.pdf<br>https://www.jxrszx.cn/doc_30226094.html | 低。需和正式库已有江西国泰集团分开，二者不是同一主体。 | 优先清洗；主体、上市公告、招聘入口分开写。 |
| 中国五洲工程设计集团有限公司 | 企业 | P1 | 官网和招聘系统清楚，火炸药工程设计、弹药试验场工艺设计、抗爆防爆方向很贴近专业。 | https://wzsjy.norincogroup.com.cn/col/col1432/index.html<br>https://zhongguowuzhou.zhiye.com/<br>https://zhongguowuzhou.zhiye.com/zpdetail/390815970?PageIndex=0&c=-1&d=-1&p=3%5E-1&r=2 | 低。正式 50 家暂无该主体。 | 优先清洗；按“兵器工业工程设计/火炸药工程设计”口径写。 |
| 抚顺隆烨化工南杂木有限公司 | 企业 | P1 | 政府资料和省级就业平台都能追，电子雷管脚线、电子模块、数码雷管芯片模组线索明确。 | https://www.fushun.gov.cn/006/006004/006004002/20240618/5cb5ba8c-78c9-40aa-8e10-69c45a880f94.html<br>https://bys.lnrc.com.cn/zhsy.do?method=tj_dwsl_detail_dNew&pkid=dda796aa-967d-42da-89e6-aa1401067285&zphid=ffa28d77-869a-4bb6-9bd8-50ae576c191b | 低。正式 50 家暂无该主体；总部口径需另行拆清。 | 优先清洗南杂木公司；不要混写抚顺隆烨总部和其他基地。 |
| 中国兵器工业第二〇四研究所（西安近代化学研究所） | 企业 | P1 | 多所高校就业页支撑含能材料、火炸药、推进剂、弹药技术方向，专业相关性强。 | https://pmpi.ustc.edu.cn/_t1156/2019/0917/c16653a391589/page.htm<br>https://career.cup.edu.cn/news/view/aid/84564/tag/xwzp<br>https://jobcareer.sdu.edu.cn/eweb/jygl/index.so?id=AejfNpYn1UQjSE1xAG8uUx&lmxhV=0402&modcode=jygl_zpxxck&rklx=jyw&subsyscode=zpfw&type=ssoZxzpView | 低。正式 50 家暂无该主体。 | 优先清洗；补最新官方招聘更好，旧招聘只写历史样本。 |
| 无锡盛景微电子股份有限公司 | 企业 | P2 | 官网和上交所披露材料可支撑工业电子雷管核心控制组件、起爆控制器、芯片设计方向。 | https://www.holyview.com/about.html?pid=17<br>https://static.sse.com.cn/stock/disclosure/announcement/c/202303/001499_20230301_GKGN.pdf | 低。正式库已有金奥博，但不是同一主体。 | 下一批可清洗；先补招聘入口，没补到也可保守写为电子雷管上游技术企业。 |
| 河北云山化工集团有限公司 | 企业 | P2 | 官网可支撑民爆器材科研、生产、销售和爆破服务，华北区域补位价值较好。 | https://www.hbyunshan.com/<br>https://www.hbyunshan.com/wap/blank.php?channel_id=21545250&username=yunshan123 | 低。正式 50 家暂无该主体。 | 清洗前补招聘入口；薪资、作息、岗位保持未知/待核对。 |
| 浙江利化民爆股份有限公司 | 企业 | P2 | 官网公司简介和业务页清楚，能补长三角民爆生产、爆破施工、矿服方向。 | https://www.liminchem.com/company.html<br>https://www.liminchem.com/business.html | 低。正式 50 家暂无该主体。 | 补学校就业网或招聘公告后清洗；没有招聘时先做保守企业档案。 |
| 北方工程设计研究院有限公司 | 企业 | P2 | 学校就业网招聘简章出现弹药工程与爆炸技术、特种能源等专业需求，和学生就业检索高度相关。 | https://career.hebut.edu.cn/home/correcruit/content/id/70422.html<br>https://jdjyw.jlu.edu.cn/portal/jyzp/recruit/details?id=01bc814c4a3541b58398a02ac95200c7 | 低。正式 50 家暂无该主体。 | 清洗前补官网；按“兵器工程设计/特种能源招聘线索”写。 |
| 黑龙江华安民爆器材有限责任公司 | 企业 | P2 | 国聘和政府资料可追，能补黑龙江民爆、现场混装工业炸药、爆破服务方向。 | https://www.iguopin.com/company?id=10685311209286668<br>https://www.nenjiang.gov.cn/njs/c100510/202412/c11_314771.shtml | 中低。与北方华安集团有隶属关系，但正式 50 家暂无该主体。 | 先补独立官网或学校就业网；清洗时写清隶属关系，不和集团混写。 |

## 院校优先 5 条

| 名称 | 类型 | 优先级 | 为什么适合下一批 | 主要入口链接 | 重复风险 | 建议动作 |
| --- | --- | --- | --- | --- | --- | --- |
| 北京科技大学 | 院校 | P1 / 本科近相关 + 考研相关 | 学院官网直接支撑安全工程、安全科学与工程、矿山安全、火灾防治等方向，入口清楚。 | https://srse.ustb.edu.cn/xssz/aqkxygcx.htm<br>https://www.ustb.edu.cn/zsjy/yjszs/index.htm<br>https://srse.ustb.edu.cn/info/1099/8916.htm | 低。正式 32 所暂无该校。 | 优先清洗；本科只写安全工程近相关，不写弹药工程本科。 |
| 天津理工大学 | 院校 | P1 / 本科近相关 + 考研相关 | 学院学科介绍和 2026 硕士目录可支撑安全科学与工程、安全工程、防火与防爆技术方向。 | https://ha.tjut.edu.cn/info/1098/1244.htm<br>https://yjs.tjut.edu.cn/__local/B/AD/CF/A9D3CC1ABC23872C6C23540B343_CAC64694_400F4.pdf | 低。正式 32 所暂无该校。 | 优先清洗；招生人数、复试线、就业率不写死。 |
| 辽宁石油化工大学 | 院校 | P1 / 本科近相关 + 考研相关 | 招生办、学院、研究生院入口齐全，可支撑安全工程、化工安全、安全科学与工程。 | https://zhaosheng.lnpu.edu.cn/info/1044/1391.htm<br>https://hjaqxy.lnpu.edu.cn/info/1471/4412.htm<br>https://ges.lnpu.edu.cn/info/1063/5992.htm?s=109%3Ft%3Dpc | 低。正式 32 所暂无该校。 | 优先清洗；只写化工安全/易燃易爆化学品安全近相关。 |
| 中国科学技术大学 | 院校 | P2 / 考研相关 + 跨考参考 | 火灾安全全国重点实验室和教师主页能支撑安全科学与工程、火灾爆炸、氢安全、爆燃转爆轰方向。 | https://sklfs.ustc.edu.cn/2025/0606/c5825a687065/page.htm<br>https://safetyse.ustc.edu.cn/2024/1214/c4546a665348/page.htm<br>https://faculty.ustc.edu.cn/xiaohuahua/zh_CN/index.htm | 低。正式 32 所暂无该校。 | 后续清洗；明确写考研/跨考，不写本科弹药。 |
| 中国科学院大学（力学所培养单位） | 院校 | P2 / 考研相关 + 跨考参考 | 国科大招生单位页明确出现爆炸力学方向，力学所官网能支撑冲击动力学、高速碰撞等方向。 | https://admission.ucas.ac.cn/info/ZhaoshengDanweiDetail/0C5EE6E2-3029-4855-BB6A-8C0E6C43CC74/8000732026<br>https://imech.cas.cn/edu/zsjy/zs/sszsxx/zsxx/<br>https://www.imech.cas.cn/cirf/research/ | 低。正式 32 所暂无该培养单位口径。 | 后续清洗；按研究生培养单位/跨考方向处理，不写本科院校专业。 |

## 暂缓对象和原因

- 中国兵器工业第二〇三研究所：方向相关，但本轮只有非官网招聘线索，先补官网或学校就业网。
- 中国兵器工业集团航空弹药研究院有限公司：方向很相关，但主要入口是招聘平台/聚合页，先补官方或学校就业网。
- 陕西北方友邦爆破科技有限公司：与正式库已有陕西北方民爆集团、北方爆破科技有限公司存在体系重叠，先去重。
- 浙江龙讯集团有限公司：集团、宁波领微、招聘签约主体未拆清，暂缓。
- 浙江长鹏科技有限公司：电子雷管项目线索存在，但可能与浙江物产民爆、新联民爆交叉，先去重。
- 北京煋邦数码科技有限公司、贵州全安密灵科技有限公司：电子雷管芯片方向有价值，但缺官网或官方招聘强入口。
- 上海慧盾工程科技有限公司：抗爆安全技术相关，但缺招聘入口和弹药/民爆直接岗位。
- 同济大学、河海大学、上海交通大学：跨考线索可留，直接性不如北科大、天津理工、辽宁石化和国科大力学所，先补专业目录/导师页。
- 中国民航大学：目前以研招网和 PDF 线索为主，官方研究生院/学院页不足，暂缓。
