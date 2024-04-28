import anime from "animejs";
import {
  Component,
  createSignal,
  For,
  mergeProps,
  onMount,
  Show,
} from "solid-js";

const App: Component = (props) => {
  const _props = mergeProps({ numberOfOptions: 4 }, props);

  const [colors, setColors] = createSignal<string[]>([]);
  const [correctOption, setCorrectOption] = createSignal<number>(0);
  const [isCorrect, setIsCorrect] = createSignal<boolean>();

  const [totalAttempts, setTotalAttempts] = createSignal(0);
  const [totalCorrect, setTotalCorrect] = createSignal(0);

  let el: HTMLDivElement | undefined = undefined;
  let messageEl: HTMLDivElement | undefined = undefined;

  const setup = () => {
    setIsCorrect(undefined);
    const allColors = [...Array(_props.numberOfOptions)].map(() =>
      getRandomColor()
    );
    const correctOption = getRandomNumber(allColors.length);

    setCorrectOption(correctOption);
    setColors(allColors);

    const correctColor = allColors[correctOption];
    if (el) {
      el.style.backgroundColor = correctColor;
    }
  };

  onMount(() => {
    setup();
  });

  const handleRetry = () => {
    setup();
    setTotalAttempts((val) => val + 1);
  };

  const handleClick = (color: string) => {
    setTotalAttempts((val) => val + 1);
    resetMessage();
    setTimeout(() => {
      if (color === colors()[correctOption()]) {
        setIsCorrect(true);
        setTotalCorrect((val) => val + 1);
      } else {
        setIsCorrect(false);
      }
      fadeIn();
    }, 10);
  };

  const resetMessage = () => {
    anime({
      targets: messageEl,
      translateY: -60,
      opacity: 0,
      maxHeight: 0,
    });
  };

  const fadeIn = () => {
    anime({
      targets: messageEl,
      translateY: [-60, 0],
      opacity: [0, 1],
      maxHeight: 60,
    });
  };

  return (
    <div class="font-mono">
      <div
        ref={el}
        class="flex w-screen h-screen p-4 justify-center items-center absolute -z-10"
      ></div>
      <div class="py-2 px-4 fixed top-0 bg-white flex flex-col md:flex-row justify-between w-full md:items-center opacity-50">
        <h1 class="md:text-3xl text-xl">Guess the color</h1>
        <hr class="md:hidden" />
        <div class="flex flex-col items-end">
          <span class="text-green-600">
            Got right:
            <span>{totalCorrect()}</span>
          </span>
          <span>Total Attempts: {totalAttempts()}</span>
        </div>
      </div>
      <div class="h-screen flex flex-col items-center justify-center">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
          <For each={colors()}>
            {(color) => (
              <button
                onClick={() => handleClick(color)}
                class="rounded bg-blue-500 text-white py-2 px-4"
              >
                {color}
              </button>
            )}
          </For>
        </div>
        <div class="flex justify-center">
          <button
            onClick={handleRetry}
            class="rounded bg-yellow-500 mt-4 text-white  py-2 px-8"
          >
            Retry
          </button>
        </div>
        <div class="pt-4 h-14">
          <div class="flex justify-center" ref={messageEl}>
            <Show when={isCorrect() !== undefined}>
              <div class="rounded bg-cool-gray-300 py-2 px-12 inline-flex justify-center overflow-hidden">
                {isCorrect() ? (
                  <div class="text-green-800">You are correct</div>
                ) : (
                  <div class="text-red-800">You are incorrect</div>
                )}
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const getRandomColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

const getRandomNumber = (totalOptions: number) => {
  return Math.floor(Math.random() * totalOptions);
};
