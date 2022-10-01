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

  let el: HTMLDivElement | undefined = undefined;

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
  };

  const handleClick = (color: string) => {
    setIsCorrect(undefined);
    setTimeout(() => {
      if (color === colors()[correctOption()]) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }, 100);
  };

  return (
    <div class="m-4">
      <div ref={el} class="rounded flex h-30 p-4 justify-center items-center">
        <div class="bg-white rounded bg-opacity-50 py-2 px-4">
          Guess the color
        </div>
      </div>
      <div class="flex flex-wrap mt-4 gap-4 justify-center">
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
        <Show when={isCorrect() !== undefined}>
          <div class="rounded bg-cool-gray-300 mt-4 py-2 px-12 inline-flex justify-center">
            {isCorrect() ? (
              <div class="text-green-800">You are correct</div>
            ) : (
              <div class="text-red-800">You are incorrect</div>
            )}
          </div>
        </Show>
      </div>
      <div class="flex justify-center">
        <button
          onClick={handleRetry}
          class="rounded bg-yellow-500 mt-4 text-white  py-2 px-8"
        >
          Retry
        </button>
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
