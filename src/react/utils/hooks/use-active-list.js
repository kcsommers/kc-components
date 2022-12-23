/**
 * This hook can be used to rotate the active item in a list of items.
 * The interval runs immediately, but the setIsActive function can be used
 * by the consumer to toggle it under certain conditions.
 *
 */

import { useEffect, useState } from 'react';
import { useInterval } from 'kc_components/react/utils/hooks/use-interval';

const DEFAULT_INTERVAL = 5000;

export const useActiveList = (items, interval = DEFAULT_INTERVAL) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(items[activeIndex]);
  const [isActive, setIsActive] = useState(true);

  const nextItem = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    // update active item when index changes
    // this can be set from hook consumer
    setActiveItem(items[activeIndex]);
  }, [activeIndex]);

  const { toggleInterval, intervalIsRunning } = useInterval(
    nextItem,
    interval,
    true
  );

  useEffect(() => {
    // when isActive changes, check the status of the interval
    // to see if it needs to be toggled
    const shouldToggleInterval =
      (isActive && !intervalIsRunning) || (!isActive && intervalIsRunning);
    if (shouldToggleInterval) {
      toggleInterval();
    }
  }, [isActive]);

  return {
    activeItem,
    activeIndex,
    setActiveIndex,
    setIsActive
  };
};
