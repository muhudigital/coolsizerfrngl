import { CoolSizerFrngl } from "@repo/ui/coolsizer";

export default function Page() {
  return (
    <main className="bg-white flex flex-col gap-4">
      <CoolSizerFrngl directions={["xy"]} className="bg-blue-200 p-8">
        <div className="flex flex-col gap-20 bg-blue-300">
          <div>Test 1</div>
          <div>Test 1 - 1</div>
        </div>
      </CoolSizerFrngl>
      <CoolSizerFrngl directions={["x", "xy"]} className="bg-red-200">
        Test 2
      </CoolSizerFrngl>
      <div className="flex flex-row gap-4">
        <CoolSizerFrngl
          className="bg-slate-200 flex justify-center items-center w-[200px] h-[200px]"
          minWidth={100}
          minHeight={200}
          xyHandleClassName="bg-lime-500 rounded-full w-8 -rotate-45"
        >
          <CoolSizerFrngl directions={["x", "xy"]} className="bg-red-200">
            Test 3
          </CoolSizerFrngl>
        </CoolSizerFrngl>
        <div className="flex-grow bg-slate-500"></div>
      </div>
    </main>
  );
}
