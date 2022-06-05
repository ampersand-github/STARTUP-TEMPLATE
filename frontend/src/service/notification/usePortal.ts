import { useEffect, useState } from 'react';

// https://nishinatoshiharu.com/modal-provider-portal/

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};

export const usePortal = (id: string) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el =
      document.querySelector<HTMLElement>(`#${id}`) ?? createElement(id);
    document.body.appendChild(el);
    setElement(el);
  }, []);

  return element;
};
