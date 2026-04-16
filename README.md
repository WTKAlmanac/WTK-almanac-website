# 三国杀线下产品图鉴

这里记录三国杀线下产品资料。欢迎补充产品笔记、实物图片、开箱信息、配件数量、将池信息和参考资料。

## 零基础贡献指南：Obsidian 编辑、Fork 和 Pull Request

这份指南写给没有编程和 Git 使用经验的朋友。推荐使用 GitHub Desktop 下载资料库、使用 Obsidian 编写笔记、再通过 GitHub Desktop 提交 Pull Request。

你不需要使用命令行，也不需要知道 Git 的底层原理。

如果你不想操作 GitHub，也可以直接把资料、图片、来源链接和署名发给维护者，由维护者代为整理。

## 1. 你需要安装什么

请先安装两个软件：

- GitHub Desktop：用于下载资料库、查看你改了哪些文件、提交修改和发起 Pull Request。
- Obsidian：用于编辑笔记和插入图片。

GitHub Desktop 下载地址：<https://desktop.github.com>

Obsidian 下载地址：<https://obsidian.md>

安装完成后，请登录你的 GitHub 账号。如果还没有账号，可以先在 <https://github.com> 注册。

## 2. 先选对资料库

本网站的笔记内容不直接在网站主仓库里维护，而是在两个独立资料库中维护：

- 官正产品：<https://github.com/WTKAlmanac/WTK-core-almanac>
- 官盗产品：<https://github.com/WTKAlmanac/WTK-low-priced-almanac>

请根据你要补充的产品类型，进入对应资料库操作。

不要直接修改网站主仓库里的 `content/官正` 或 `content/官盗`。这两个目录只是连接到上面两个资料库。

如果不确定产品属于官正还是官盗，可以先联系维护者确认。

## 3. Fork 资料库

Fork 的意思是“复制一份资料库到你自己的账号下”。你没有原资料库的直接修改权限时，需要先 Fork，再从你的副本提交修改。

操作步骤：

1. 打开对应资料库，例如官盗资料库 <https://github.com/WTKAlmanac/WTK-low-priced-almanac>
2. 点击页面右上角的 `Fork`
3. 进入 Fork 页面后，一般不需要改设置
4. 点击 `Create fork`
5. 等待 GitHub 创建完成

创建完成后，你会进入一个地址类似这样的页面：

```text
https://github.com/你的用户名/WTK-low-priced-almanac
```

看到地址里有你的用户名，就说明你现在位于自己的 Fork 副本中。

## 4. 用 GitHub Desktop 下载你的 Fork

请下载“你自己的 Fork”，不要直接下载原资料库。

操作步骤：

1. 打开 GitHub Desktop
2. 点击 `File`
3. 点击 `Clone repository`
4. 在列表中选择你刚刚 Fork 的资料库
5. 选择一个你能找到的位置保存，例如“文档”或“桌面”
6. 点击 `Clone`

下载完成后，GitHub Desktop 左上角显示的资料库名称应该是你 Fork 的资料库。

如果你不确定是否下载对了，可以看 GitHub Desktop 顶部或网页地址，应该能看到你的 GitHub 用户名。

注意：GitHub Desktop 下载资料库时，不一定会自动把作为 submodule 的 Obsidian 图片插件一起下载下来。因此 Clone 完成后，还需要按下一节检查并下载插件。

## 5. 下载 Obsidian 图片插件

本资料库的图片处理插件放在：

```text
.obsidian/plugins/paste-image-webp-renamer
```

这个插件是 submodule。它可能不会随着 GitHub Desktop 的 Clone 自动下载。如果插件没有下载，Obsidian 仍然能打开笔记，但粘贴图片时不会自动转 WebP、自动改名、自动放入 `附件` 目录。

请先检查插件是否存在：

1. 在 GitHub Desktop 顶部点击 `Repository`
2. 点击 `Show in Explorer`
3. 进入 `.obsidian`
4. 进入 `plugins`
5. 查看里面是否有 `paste-image-webp-renamer` 文件夹

如果没有这个文件夹，或者文件夹是空的，请按下面步骤下载插件。

在 Windows 上：

1. 回到 GitHub Desktop
2. 顶部点击 `Repository`
3. 点击 `Open in Command Prompt` 或 `Open in Git Bash`
4. 复制下面这行命令，粘贴进去后按回车

```bash
git submodule update --init --recursive
```

在 macOS 上：

1. 回到 GitHub Desktop
2. 顶部点击 `Repository`
3. 点击 `Open in Terminal`
4. 复制下面这行命令，粘贴进去后按回车

```bash
git submodule update --init --recursive
```

命令执行完成后，再检查 `.obsidian/plugins/paste-image-webp-renamer` 文件夹。里面应该能看到插件文件，例如 `manifest.json`。

如果你不想碰命令行，请先不要用 Obsidian 批量粘贴图片，可以联系维护者帮你处理插件下载。

## 6. 用 Obsidian 打开资料库

操作步骤：

1. 打开 Obsidian
2. 选择 `Open folder as vault`
3. 选择刚才 GitHub Desktop 下载到本地的资料库文件夹
4. 打开后，在左侧文件列表中找到要编辑的笔记

第一次打开时，Obsidian 可能会提示是否信任这个仓库、是否启用社区插件。请允许启用本资料库自带的插件。

本资料库使用了图片处理插件 `paste-image-webp-renamer`。它会自动处理你插入的图片，所以请尽量使用桌面版 Obsidian 编辑，不建议用手机版 Obsidian 处理图片。

如果 Obsidian 没有启用插件，或者你找不到插件，请先不要批量粘贴图片，联系维护者处理。

## 7. 在 Obsidian 里编辑笔记

你可以在 Obsidian 里做这些事：

- 修改已有产品笔记。
- 新增产品笔记。
- 粘贴或拖入产品图片。
- 补充资料来源链接。

新增笔记时，建议先复制同类型的旧笔记或模板，再改成新产品内容。

示例位置：

- 官正模板：`模板/官正模板.md`
- 官盗模板：`模板/官盗模板.md`

## 8. 图片由插件自动保存，不需要你手动找位置

在 Obsidian 里粘贴或拖入图片后，插件会自动做这些事：

- 把图片转成 WebP 格式。
- 自动给图片改名。
- 自动把图片放到 `附件` 目录。
- 自动在笔记里写入图片引用。

所以你不需要自己移动图片，也不需要自己记住图片保存到了哪里。

但是，提交修改时必须把这些新增图片一起提交。否则网站上会出现笔记里有图片引用、但图片打不开的问题。

## 9. 如何知道自己新增了哪些图片

请以 GitHub Desktop 的 `Changes` 列表为准。

操作步骤：

1. 保存 Obsidian 里的笔记。
2. 打开 GitHub Desktop。
3. 点击左侧的 `Changes`。
4. 你会看到这次修改涉及的所有文件。

通常你会看到两类文件：

- `.md` 文件：你编辑的笔记。
- `.webp` 文件：插件自动生成或保存的图片，通常在 `附件` 目录下。

你不需要提前知道图片在哪里。只要 GitHub Desktop 的 `Changes` 里出现了新的 `.webp` 图片，并且这些图片是你这次笔记用到的，就应该一起提交。

提交前请重点检查：

- 你修改的 `.md` 笔记是否在 `Changes` 里。
- 新增的 `.webp` 图片是否在 `Changes` 里。
- 不要只提交笔记而漏掉图片。
- 不要提交和本次修改无关的其他笔记。
- 如果出现你不认识的文件，先不要急着提交，可以询问维护者。

如果你粘贴了图片，但 GitHub Desktop 里没有出现新的 `.webp` 文件，可能是图片没有成功保存，或者你打开的不是正确的资料库文件夹。

## 10. 用 GitHub Desktop 提交修改

确认 `Changes` 里的文件无误后，就可以提交。

操作步骤：

1. 在 GitHub Desktop 左下角找到 `Summary`
2. 写一句简短说明，例如“补充官渡之战开箱图片”
3. 如果下面有 `Description`，可以写更详细的资料来源或说明，也可以留空
4. 点击 `Commit to main`

这里的 `Commit` 可以理解为“把这一批修改打包保存”。这一步只保存到你自己的电脑里，还没有发到 GitHub 网站上。

提交后，点击 `Push origin`，把修改上传到你的 Fork。

## 11. 提交 Pull Request

Pull Request 简称 PR，意思是“请求维护者把你的修改合并到原资料库”。

上传后，GitHub Desktop 通常会显示 `Create Pull Request` 或类似按钮。你也可以回到 GitHub 网页，在你的 Fork 页面点击 `Contribute`，再点击 `Open pull request`。

提交 PR 时，请检查目标仓库是否正确。

目标仓库应当是：

```text
WTKAlmanac/WTK-core-almanac
```

或：

```text
WTKAlmanac/WTK-low-priced-almanac
```

如果目标仓库显示成你自己的用户名，说明方向可能反了，需要返回检查。

## 12. PR 标题和说明怎么写

标题不用复杂，写清楚即可。

示例：

```text
补充 S2010 官渡之战开箱图片
```

```text
新增 S0060 三国杀标准2019版资料
```

```text
修正 I5003 无极乾坤配件数量
```

说明可以复制下面这个模板：

```markdown
## 修改内容

- 

## 资料来源

- 

## 不确定的地方

- 
```

如果图片是你自己拍的，可以写：

```text
图片为本人实物拍摄。
```

如果资料来自网页，请贴出链接。维护者需要知道信息来源，方便核对。

## 13. PR 提交后要做什么

提交 PR 后，维护者会检查你的修改。可能会出现三种情况：

- 直接合并：说明你的修改没有问题。
- 留言询问：维护者需要你补充来源、解释信息或调整内容。
- 要求修改：你需要继续在自己的 Fork 里改同一批文件。

如果维护者要求修改，不需要重新开 PR。你只要继续用 Obsidian 修改，再用 GitHub Desktop `Commit` 和 `Push`，原来的 PR 会自动更新。

## 14. 如果原资料库更新了怎么办

如果你 Fork 后过了一段时间才继续修改，GitHub 可能提示你的 Fork 落后于原资料库。

你可以先在 GitHub Desktop 点击 `Fetch origin`，再根据提示同步更新。

也可以在 GitHub 网页打开你的 Fork，如果看到 `Sync fork`：

1. 点击 `Sync fork`
2. 点击 `Update branch`
3. 等待同步完成

如果你不确定要不要同步，可以先问维护者。

## 15. 提交前检查清单

提交 PR 前，请检查：

- 你是在自己的 Fork 里修改，而不是直接改原资料库。
- Obsidian 打开的文件夹是 GitHub Desktop 下载的那个资料库。
- `.obsidian/plugins/paste-image-webp-renamer` 插件已经下载，并且不是空文件夹。
- GitHub Desktop 的 `Changes` 里包含你修改的 `.md` 笔记。
- GitHub Desktop 的 `Changes` 里包含本次新增的 `.webp` 图片。
- 没有漏掉 Obsidian 插件自动生成的图片。
- 没有提交和本次修改无关的文件。
- PR 说明里写了资料来源。
- 不确定的信息已经在 PR 说明里标出来。

## 16. 常见问题

### GitHub Desktop 下载 Fork 时会自动下载 Obsidian 图片插件吗？

不一定。这个插件是 submodule，GitHub Desktop 的普通 Clone 不能保证把它完整下载出来。请按“下载 Obsidian 图片插件”一节检查 `.obsidian/plugins/paste-image-webp-renamer` 是否存在；如果不存在或是空文件夹，需要运行 `git submodule update --init --recursive`。

### 我不知道 Obsidian 把图片放到哪里了怎么办？

不用找。打开 GitHub Desktop 看 `Changes`，新增的 `.webp` 文件就是本次新增图片。提交时把相关 `.webp` 文件和笔记一起提交即可。

### 我只提交了笔记，忘记提交图片怎么办？

回到 GitHub Desktop，把漏掉的图片文件再 `Commit` 和 `Push`。原来的 PR 会自动更新，不需要重新开 PR。

### 我发现 `Changes` 里有很多图片，不知道哪些是本次新增的怎么办？

先不要提交。可以根据图片文件名、修改时间和笔记里引用的图片名判断。如果仍然不确定，请截图发给维护者确认。

### 我没有权限修改原资料库怎么办？

这是正常的。请先 Fork 到自己的账号，再从自己的 Fork 提交 Pull Request。

### 我已经提交了 PR，但发现写错了怎么办？

继续用 Obsidian 修改，然后在 GitHub Desktop 里 `Commit` 和 `Push`。原 PR 会自动更新。

### 我点错按钮了怎么办？

不用担心。只要还没有被维护者合并，就不会影响正式内容。你可以在 PR 里留言说明，也可以联系维护者。

### 我可以只提交图片或资料来源吗？

可以。只提交图片、只补充参考链接、只修错别字都可以。

### 我不想学 GitHub，还能参与吗？

可以。把资料、图片、来源链接和署名发给维护者即可。
