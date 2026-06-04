import type { ArrowType } from '@rc-component/trigger';
import { Placement, Point } from '../interface';
export const getPopupAlign = (
  placement: Placement,
  arrow?: boolean | ArrowType,
) => {
  let points = [] as unknown as [Point | 'cb' | 'ct', Point | 'cb' | 'ct'];
  let offset = [] as unknown as [number, number];
  const dis = arrow ? 8 : 4;
  switch (placement) {
    case 'top':
      points = ['bc', 'tc'];
      offset = [0, -dis];
      break;
    case 'bottom':
      points = ['tc', 'bc'];
      offset = [0, dis];
      break;
    case 'left':
      points = ['cr', 'cl'];
      offset = [-dis, 0];
      break;
    case 'right':
      points = ['cl', 'cr'];
      offset = [dis, 0];
      break;
    case 'topLeft':
      points = ['bl', 'tl'];
      offset = [0, -dis];
      break;
    case 'topRight':
      points = ['br', 'tr'];
      offset = [0, -dis];
      break;
    case 'bottomLeft':
      points = ['tl', 'bl'];
      offset = [0, dis];
      break;
    case 'bottomRight':
      points = ['tr', 'br'];
      offset = [0, dis];
      break;
    case 'leftTop':
      points = ['tr', 'tl'];
      offset = [-dis, 0];
      break;
    case 'leftBottom':
      points = ['br', 'bl'];
      offset = [-dis, 0];
      break;
    case 'rightTop':
      points = ['tl', 'tr'];
      offset = [dis, 0];
      break;
    case 'rightBottom':
      points = ['bl', 'br'];
      offset = [dis, 0];
      break;
  }

  return {
    points,
    offset,
  };
};

export const getAnimate = (placement: Placement, open: boolean) => {
  if (placement.startsWith('top') || placement.startsWith('bottom')) {
    return {
      initial: { height: 0, opacity: 1 },
      animate: open ? { height: 'auto' } : { height: 0 },
      exit: { height: 0 },
    };
  }

  return {
    initial: { width: 0, opacity: 1 },
    animate: open ? { width: 'auto' } : { width: 0 },
    exit: { width: 0 },
  };
};
