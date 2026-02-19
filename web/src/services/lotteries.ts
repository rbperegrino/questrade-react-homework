type CreateLotteryPayload = {
  name: string;
  prize: string;
};

type RegisterLotteryPayload = {
  lotteryId: string;
  name: string;
};

type LotteryType = 'simple';

export type LotteryResponse = {
  id: string;
  name: string;
  prize: string;
  type: LotteryType;
  status: string;
};

type ErrorResponse = {
  error: string;
};

const LOTTERIES_ENDPOINT = 'http://localhost:3000/lotteries';
const REGISTER_ENDPOINT = 'http://localhost:3000/register';
let getLotteriesInFlight: Promise<LotteryResponse[]> | null = null;

export async function getLotteries(): Promise<LotteryResponse[]> {
  if (getLotteriesInFlight) {
    return getLotteriesInFlight;
  }

  getLotteriesInFlight = (async () => {
    const response = await fetch(LOTTERIES_ENDPOINT);

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.error || 'Failed to fetch lotteries');
    }

    return (await response.json()) as LotteryResponse[];
  })();

  try {
    return await getLotteriesInFlight;
  } finally {
    getLotteriesInFlight = null;
  }
}

export async function createLottery({
  name,
  prize,
}: CreateLotteryPayload): Promise<LotteryResponse> {
  const response = await fetch(LOTTERIES_ENDPOINT, {
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

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    throw new Error(error.error || 'Failed to create lottery');
  }

  return (await response.json()) as LotteryResponse;
}

export async function registerLottery({
  lotteryId,
  name,
}: RegisterLotteryPayload): Promise<void> {
  const response = await fetch(REGISTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lotteryId,
      name,
    }),
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    throw new Error(error.error || 'Failed to register for the lottery');
  }
}
