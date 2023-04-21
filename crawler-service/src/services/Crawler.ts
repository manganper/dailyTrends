import scrapeIt from 'scrape-it';
import { Origin, urlOrigin } from '@config/Origin';
import { getTodayDate } from '@helpers/Notice';
import { saveNotice } from '@middlewares/Notice';
import { INotice } from '@types';

const scrape = async (url: string): Promise<void> => {
  // TODO: Fill in the opts object and change casting
  const scrapeResult = await scrapeIt(url, {}) as unknown as INotice[];
  // From here I assume that the scrapeResult object contains an array.
  for (const notice of scrapeResult) {
    if (urlOrigin[0] === url) notice.origin = Origin.MUNDO;
    else notice.origin = Origin.PAIS;
    notice.date = getTodayDate();
    await saveNotice(notice);
  }
};

export {
  scrape,
};
