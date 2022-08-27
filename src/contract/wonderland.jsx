import { ethers } from "ethers";
import { abi } from "./ABI";


const daiAddress = "0x1D70D57ccD2798323232B2dD027B3aBcA5C00091";
const usdcAddress = "0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47";

const initContracts = (token) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.getDefaultProvider();

  if (token === "DAI") {
    const contract =
      window.ethereum != null
        ? new ethers.Contract(daiAddress, abi, provider.getSigner())
        : null;
      
   console.log(contract)
    return contract;
  } 
  else {
    const contract =
      window.ethereum != null
        ? new ethers.Contract(usdcAddress, abi, provider.getSigner())
        : null;
    return contract;
  }

};

/*
 --- SMART CONTRACT ---
function approve(address spender, uint256 amount) public virtual override returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
}
*/

// Aprove tokens to be sent

export const approve = async ( spender, amount, token) => {
  const approve = await initContracts(token).approve( spender, amount);
  return approve;
};

/*
 --- SMART CONTRACT ---
 function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
*/

// Amount of tokens approved to be sent
const allowance = async (owner, spender, token) => {
  const allowance = await initContracts(token).allowance(owner, spender);
  return allowance;
};

/*
  --- SMART CONTRACT ---
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     
   function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
    _transfer(sender, recipient, amount);

    uint256 currentAllowance = _allowances[sender][_msgSender()];
    require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
    _approve(sender, _msgSender(), currentAllowance - amount);

    return true;
    }
*/

export const send = async (owner, recipient, amount, token) => {
  const allowance = await initContracts(token).transferFrom(owner, recipient, amount);
  return allowance;
};


