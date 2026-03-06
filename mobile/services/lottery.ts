import { Lottery } from '../types';

const LOTTERIES_ENDPOINT = 'http://localhost:3000/lotteries';
const REGISTER_ENDPOINT = 'http://localhost:3000/register';

export async function createNewLottery({
  name,
  prize,
}: {
  name: string;
  prize: string;
}): Promise<Lottery> {
  try {
    const response = await fetch(`${LOTTERIES_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'simple',
        name,
        prize,
      }),
    });

    const body = (await response.json()) as Lottery;

    return body;
  } catch (e) {
    console.error(e);

    throw e;
  }
}

export async function getLottieries() {
  try {
    const response = await fetch(`${LOTTERIES_ENDPOINT}`);

    const body = (await response.json()) as Array<Lottery>;

    return body;
  } catch (e) {
    console.error(e);

    throw e;
  }
}

export async function registerToLottery({
  name,
  lotteryId,
}: {
  name: string;
  lotteryId: string;
}) {
  try {
    const response = await fetch(`${REGISTER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, lotteryId }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.error(e);

    throw e;
  }
}
