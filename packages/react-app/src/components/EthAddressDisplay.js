import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/core";
import { useEns } from "../contexts/DappContext";

import { truncateAddr } from "../utils/Helpers";

const EthAddressDisplay = ({ address }) => {
  const [ens] = useEns();
  const [currentAddress, setCurrentAddress] = useState();
  useEffect(() => {
    if (!ens.provider || !address) {
      return;
    }
    const getDisplayAddress = async (addr) => {
      console.log(addr);
      try {
        const name = await ens.provider.lookupAddress(addr);
        setCurrentAddress(name ? truncateAddr(name) : truncateAddr(addr));
      } catch {
        setCurrentAddress(truncateAddr(addr));
      }
    };
    console.log(address);
    getDisplayAddress(address);
  }, [ens, address]);

  return <Text>{currentAddress}</Text>;
};

export default EthAddressDisplay;
