export const getImageUrl = (
  path: string,
  ext: 'png' | 'webp' | 'jpg',
  url: string,
): string => {
  return new URL(`${path}.${ext}`, url).href;
};

export const formatPhone = (phone: string): string => {
  return phone
    .replace(/\D+/g, '')
    .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5');
};

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
};

export const downloadPDF = (url: string, filename: string): void => {
  fetch(url, {
    method: 'GET',
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename || 'file'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};

export const pluralizeRussianWord = (
  count: number,
  words: string[] | string,
) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};
