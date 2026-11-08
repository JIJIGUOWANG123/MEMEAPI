# MemeAPI 接口说明（静态网页）

把整个 `静态网页` 文件夹上传到 GitHub Pages 即可访问。

## 目录

```text
静态网页/
├─ index.html
├─ style.css
├─ app.js
├─ data.js              # 接口数据（由构建脚本生成）
├─ assets/logo.png
└─ previews/            # 每个表情接口的效果缩略图
```

## 功能

- 左侧分类：全部 / 表情接口 / 视图接口 / 本机接口 / 其他接口
- 搜索指令、别名、功能、参数
- 每个表情接口显示：
  - 效果预览图
  - 触发指令 / 别名
  - 参数说明
  - 使用示例（可一键复制）
- 支持深色 / 浅色切换
- 手机端自适应
- 「关于 & 致谢」页面，注明表情模板来源 MemeCrafters/meme-generator

## 更新数据

在 `D:\MemeAPI\程序` 下运行：

```bash
python build_interface_previews.py   # 重新生成表情缩略图
python build_interface_docs.py       # 重新生成 data.js
```

> 生成预览需要 MemeAPI 渲染服务（5099 端口）正在运行。  
> 预览文件放在 `静态网页/previews`，文件名由模板 key 生成。

## GitHub Pages

把 `静态网页` 里的**内容**上传到仓库根目录（让 `index.html` 直接在仓库根），然后：

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

访问地址形如：

```text
https://jijiguowang123.github.io/MEMEAPI/
```
