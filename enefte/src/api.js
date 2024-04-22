export const login = async (seed) => {
    const url = 'https://87.88.20.110:3000/auth/login';
    const formData = new URLSearchParams();
    formData.append('seed', seed);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    return response;
  };
  
export const createWallet = async () => {
  const response = await fetch('https://87.88.20.110:3000/auth/create');
  return response;
};
  
export const createOffer = async (seed, nft_id, price) => {
  const url = 'https://87.88.20.110:3000/nft/createBuyOffer';
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(accessToken);
    const queryParams = new URLSearchParams({
      seed: accessToken,
      wallet_dest: seed,
      NFT_ID: nft_id,
      price: price
    });
    fetch(`${url}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit offer');
      }
    })
    .catch(error => {
      console.error("Error submiting offer:", error);
    });
};