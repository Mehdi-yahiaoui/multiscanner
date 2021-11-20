import { BiTestTube } from 'react-icons/bi';
import * as Tooltip from '@radix-ui/react-tooltip';

import 'twin.macro';

export function Beta() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger tw="focus:(ring-2 ring-blue-300) outline-none rounded-full">
        <div tw=" h-6 w-6 p-0 -top-2.5 bg-blue-500 text-yellow-400 flex items-center justify-center rounded-full cursor-pointer">
          <BiTestTube size="16" tw="filter" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content
        side="bottom"
        portalled
        tw="text-gray-200  text-sm shadow-md  bg-secondary  p-2 rounded-md"
      >
        <Tooltip.Arrow tw="text-secondary fill-current" />
        Test Feature
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
