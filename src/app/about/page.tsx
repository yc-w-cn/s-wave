import { cn } from "@/utils";

export default function Page() {
  return (
    <div
      className={cn(
        "overflow-auto h-full p-8 w-full",
        "scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent"
      )}
    >
      <h3 className="font-bold text-lg text-pink-500 mb-3">项目简介</h3>
      <div className="bg-white p-8 rounded-lg text-sm text-gray-700 leading-7">
        <p>S-WAVE 是一个纯浏览器应用，专为播客阅读而设计。</p>
        <p>用户数据储存在浏览器本地，保障隐私安全。</p>
        <p>AI听译功能利用浏览器的 WASM 特性实现，为用户提供流畅的听译体验。</p>
      </div>
      <h3 className="font-bold text-lg text-pink-500 my-3">功能特点</h3>
      <div className="bg-white p-8 rounded-lg text-gray-700 leading-7">
        <p><strong>注重隐私</strong>: 用户数据安全地储存在浏览器本地，贯彻隐私设计原则。</p>
        <p><strong>AI 听译</strong>: 利用先进的人工智能算法，准确实时地听译播客内容。 </p>
        <p>
          <strong>WebAssembly 整合</strong>: 充分利用 WebAssembly
          的能力，优化性能，提供顺畅的用户体验。
        </p>
        <p>
          <strong>MIT 许可证</strong>: S-WAVE 使用宽松的 MIT
          许可证发布，允许开放式合作和社区贡献。
        </p>
      </div>
      <h3 className="font-bold text-lg text-pink-500 my-3">版本信息</h3>
      <div className="bg-white p-8 rounded-lg text-gray-700 leading-7">
        <p>
          当前版本：v{process.env.VERSION} (Build: {process.env.BUILD_TIME})
        </p>
        <p>
          代码仓库：
          <a
            href="https://github.com/yc-w-cn/s-wave"
            target="_blank"
            className="hover:underline"
          >
            https://github.com/yc-w-cn/s-wave
          </a>
        </p>
        <p>
          项目作者：Yuchen Wang {"<"}contact@wangyuchen.cn{">"}
        </p>
      </div>
    </div>
  );
}
