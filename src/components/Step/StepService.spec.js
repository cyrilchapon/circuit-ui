/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as StepService from './StepService';

describe('StepService', () => {
  describe('calculateNextStep', () => {
    it('should return next step based on the first step by default', () => {
      expect(StepService.calculateNextStep()).toEqual(1);
      expect(StepService.calculateNextStep({ firstStep: 2 })).toEqual(3);
    });

    it('should support custom step interval', () => {
      expect(
        StepService.calculateNextStep({ step: 1, stepInterval: 3 })
      ).toEqual(4);
    });

    it('should increment step when total steps are not specified', () => {
      expect(StepService.calculateNextStep({ step: 1 })).toEqual(2);
      expect(StepService.calculateNextStep({ step: 2 })).toEqual(3);
    });

    it('should return first step in the end when total steps and cycle opts are specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: true };

      expect(StepService.calculateNextStep({ step: 0, ...baseOpts })).toEqual(
        1
      );
      expect(StepService.calculateNextStep({ step: 1, ...baseOpts })).toEqual(
        baseOpts.firstStep
      );
    });

    it('should return last step in the end when total steps without cycle are specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: false };

      expect(StepService.calculateNextStep({ step: 0, ...baseOpts })).toEqual(
        1
      );
      expect(StepService.calculateNextStep({ step: 1, ...baseOpts })).toEqual(
        baseOpts.totalSteps - 1
      );
    });
  });

  describe('calculatePreviousStep', () => {
    it('should return first step by default', () => {
      expect(StepService.calculatePreviousStep()).toEqual(0);
      expect(StepService.calculatePreviousStep({ firstStep: 2 })).toEqual(2);
    });

    it('should support custom step interval', () => {
      expect(
        StepService.calculatePreviousStep({ step: 2, stepInterval: 2 })
      ).toEqual(0);
    });

    it('should decrement step when total steps are not specified', () => {
      expect(StepService.calculatePreviousStep({ step: 3 })).toEqual(2);
      expect(StepService.calculatePreviousStep({ step: 2 })).toEqual(1);
    });

    it('should return to last step when total steps and cycle opts are specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: true };

      expect(
        StepService.calculatePreviousStep({ step: 1, ...baseOpts })
      ).toEqual(0);
      expect(
        StepService.calculatePreviousStep({ step: 0, ...baseOpts })
      ).toEqual(baseOpts.totalSteps - 1);
    });

    it('should always return to first step in the end when cycle is specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: false };

      expect(
        StepService.calculatePreviousStep({ step: 1, ...baseOpts })
      ).toEqual(0);
      expect(
        StepService.calculatePreviousStep({ step: 0, ...baseOpts })
      ).toEqual(baseOpts.firstStep);
    });
  });

  describe('callAll', () => {
    it('should all function specified as arguments', () => {
      const fnOne = jest.fn(() => 1);
      const fnTwo = jest.fn(() => 2);

      StepService.callAll(fnOne, fnTwo)();

      expect(fnOne).toHaveBeenCalledTimes(1);
      expect(fnTwo).toHaveBeenCalledTimes(1);
    });
  });
});
