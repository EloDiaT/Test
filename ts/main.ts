import '../assets/style/style.scss';


function getParent(element: HTMLElement, levels: number): HTMLElement | null {
  let currentElement: HTMLElement | null = element;
  for (let i = 0; i < levels; i++) {
      if (currentElement?.parentElement) {
          currentElement = currentElement.parentElement;
      } else {
          break;
      }
  }
  return currentElement;
}

function search(
  parentElement: any,
  block: string,
  search: string
): string {
  if (!parentElement || !parentElement.childNodes) return '';
  for (const node of parentElement.childNodes) {
    if (node.className === block && node.childNodes) {
      for (const child of node.childNodes) {
        if (
          child.className &&
          child.className.split(' ').includes(search)
        ) {
          return child.innerHTML;
        }
      }
      break;
    }
  }

  return 'Не найдено';
}

document.querySelectorAll('input').forEach(item => {
  item.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (target) {
      console.log(search(getParent(target, 2), 'tarifs_card_title', 'tarifs_card_title--name'));
    }
  })
})

function startCountdownFromCurrentTime(): void {
  let now = new Date();

  const interval = setInterval(() => {
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    const timerElement = document.getElementById('timer_sec');
    if (timerElement) {
      timerElement.innerHTML = formattedTime;
    }

    if (hours === '00' && minutes === '00' && seconds === '00') {
      clearInterval(interval);
      console.log("Конец :)");
      const timer_end = document.getElementById('timer_end') as HTMLButtonElement | null;
      if (timer_end) {
        timer_end.disabled = true;
      }
    }

    now = new Date(now.getTime() - 1000);
  }, 1000);
}

startCountdownFromCurrentTime();

