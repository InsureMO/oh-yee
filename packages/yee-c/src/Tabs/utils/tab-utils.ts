// utils/tabUtils.ts

/**
 * Get offset and direction from wheel event
 * @param e - Wheel event
 * @returns [direction, offset]
 */
export const getOffsetFromWheel = (e: WheelEvent): ['up' | 'down', number] => {
  const offset = e.deltaX || e.deltaY;
  const direction = offset < 0 ? 'up' : 'down';
  return [direction, offset];
};

/**
 * Get the transform translate values of an element
 * @param ele - HTML element
 * @returns [x offset, y offset]
 */
export const getEleTranslate = (ele: HTMLElement): [number, number] => {
  const transform = ele.style.transform;
  if (!transform) {
    return [0, 0];
  }

  const matchX = transform.match(/translateX\(([-\d.]+)px\)/);
  const x = matchX?.[1] ? parseFloat(matchX[1]) : 0;

  const matchY = transform.match(/translateY\(([-\d.]+)px\)/);
  const y = matchY?.[1] ? parseFloat(matchY[1]) : 0;

  return [x, y];
};

/**
 * Check if a tab is within the container's visible area
 * @param direction - Direction
 * @param tab - Tab element
 * @param navList - Navigation list element
 * @param navContainer - Navigation container element
 * @returns [is inside container, offset direction, offset]
 */
export const isInContainer = (
  direction: 'horizontal' | 'vertical',
  tab: HTMLElement,
  navList: HTMLElement,
  navContainer: HTMLElement,
): [boolean, string, number] => {
  let inside = false;
  const offsetDirection = '';
  const offset = 0;

  if (direction === 'horizontal') {
    const [x] = getEleTranslate(navList);
    const containerWidth = navContainer.clientWidth;
    const tabLeft = tab.offsetLeft;
    const tabWidth = tab.clientWidth;

    inside =
      tabLeft >= Math.abs(x) &&
      tabLeft + tabWidth <= containerWidth + Math.abs(x);
  } else {
    const containerHeight = navContainer.clientHeight;
    const scrollTop = navContainer.scrollTop;
    const tabTop = tab.offsetTop;

    inside = tabTop - scrollTop >= 0 && tabTop - scrollTop <= containerHeight;
  }

  return [inside, offsetDirection, offset];
};

/**
 * Set the transform translate of an element
 * @param ele - HTML element
 * @param x - x offset
 * @param y - y offset
 */
export const setEleTranslate = (
  ele: HTMLElement,
  x?: number,
  y?: number,
): void => {
  const transforms: string[] = [];

  if (typeof x === 'number') {
    transforms.push(`translateX(${x}px)`);
  }
  if (typeof y === 'number') {
    transforms.push(`translateY(${y}px)`);
  }

  ele.style.transform = transforms.join(' ');
};
