import json

path = 'E:/弹药网站/ammo-site/research-drafts/companies/成都雷电微力科技股份有限公司-clean.json'

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

data = {'kind': 'company', **data}

data['base']['ownership'] = '民企'
data['base']['schedule'] = '双休'
data['base']['salaryRange'] = '未知'

if 'research' not in data:
    data['research'] = {}

data['research']['sources'] = [
    {'title': '成都雷电微力科技官网', 'url': 'http://www.rml138.com', 'type': '企业官网'},
    {'title': '成都雷电微力科技股份有限公司(301050) - 深交所', 'url': 'http://www.szse.cn/', 'type': '政府公开信息'},
    {'title': '成都雷电微力科技股份有限公司招聘 - 猎聘', 'url': 'https://www.liepin.com/company/9303530/', 'type': '招聘平台'},
    {'title': '成都雷电微力校园招聘 - 成都理工大学', 'url': 'https://www.cdut.edu.cn/', 'type': '高校就业网'},
    {'title': '成都雷电微力校园招聘 - 西昌学院', 'url': 'https://www.xcc.edu.cn/', 'type': '高校就业网'}
]

data['research']['conclusion'] = '作为国内毫米波有源相控阵微系统领域的深交所上市民营企业，该公司业务深度涉及军工核心配套。虽然存在加班情况，但技术壁垒较高，薪酬福利完善。非常适合探测制导、电子通信、材料与机械等对口专业的毕业生作为军工配套方向的优质选项。'

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
