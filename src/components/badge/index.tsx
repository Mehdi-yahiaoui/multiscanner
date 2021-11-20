import React, {
  ComponentType,
  Component,
} from 'react';
import tw from 'twin.macro';

/**
 * @param Component
 * @param propName
 * @requires relative_parent
 * @returns
 */

interface WithBadgeProps {
  left?: boolean;
  right?: boolean;
  state: boolean;
}

export function withBadge(
  options: WithBadgeProps,
  Badge: ComponentType<any>
): <P extends object>(WrappedComponent: ComponentType<P>) => ComponentType<P> {
  return <P extends object>(WrappedComponent: ComponentType<P>) =>
    class BadgedComponent extends Component<P> {
      public render() {
        const { state, right = true, left } = options;
        return (
          <>
            <WrappedComponent {...this.props} />
            {state ? (
              <div
                tw="absolute -top-2"
                css={[left ? tw`left-1` : right && tw`-right-3`]}
              >
                <Badge />
              </div>
            ) : null}
          </>
        );
      }
    };
}
