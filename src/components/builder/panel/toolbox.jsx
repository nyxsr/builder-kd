import { Element, useEditor } from "@craftjs/core";
import { Button } from "../items/button";
import { Card } from "../items/card";
import { Container } from "../items/container";
import { Image } from "../items/image";
import { Text } from "../items/text";

export const Toolbox = () => {
    const {connectors, query} = useEditor();
  return (
    <div className="bg-white py-2 px-2 h-1/2">
      <p className="text-center font-semibold">Blocks Manager</p>
      <div className="py-3 gap-5 flex flex-wrap justify-center">
        <button ref={ref=>connectors.create(ref,<Button size='small'>Button</Button>)} className="shadow-lg w-[10rem] bg-slate-50 py-2">Button</button>
        <button ref={ref=>connectors.create(ref,<Text text='Hello world'/>)} className="shadow-lg w-[10rem] bg-slate-50 py-2">Text</button>
        <button ref={ref=>connectors.create(ref,<Element is={Container} padding={20} canvas/>)} className="shadow-lg w-[10rem] bg-slate-50 py-2">Container</button>
        <button ref={ref=>connectors.create(ref,<Card/>)} className="shadow-lg w-[10rem] bg-slate-50 py-2">Card</button>
        <button ref={ref=>connectors.create(ref,<Image/>)} className="shadow-lg w-[10rem] bg-slate-50 py-2">Image</button>
      </div>
    </div>
  );
};
