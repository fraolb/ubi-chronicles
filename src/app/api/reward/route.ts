import { NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http } from "viem";
import { celo } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { encodeFunctionData, parseEther } from "viem";

// Simple ERC-20 ABI with just the transfer function
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const GOODDOLLARADDRESS = "0x62b8b11039fcfe5ab0c56e502b1c372a3d2a9c7a";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { wallet } = body;

    // Validate required fields
    if (!wallet) {
      return NextResponse.json(
        { error: "Missing wallet address" },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json(
        { error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    // Validate contract address
    if (!GOODDOLLARADDRESS || !/^0x[a-fA-F0-9]{40}$/.test(GOODDOLLARADDRESS)) {
      return NextResponse.json(
        { error: "Contract address not configured properly" },
        { status: 500 }
      );
    }

    const privateKey = process.env.SPONSOR_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Initialize clients
    const publicClient = createPublicClient({
      chain: celo,
      transport: http("https://forno.celo.org"),
    });

    const account = privateKeyToAccount(privateKey as `0x${string}`);
    const walletClient = createWalletClient({
      account,
      chain: celo,
      transport: http("https://forno.celo.org"),
    });

    const reward = 15;
    const rewardInBigint = parseEther(reward.toString());

    // Encode transfer function call using ERC-20 ABI
    const contractData = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [wallet as `0x${string}`, rewardInBigint],
    });

    // Estimate gas
    const gasEstimate = await publicClient.estimateGas({
      account,
      to: GOODDOLLARADDRESS as `0x${string}`,
      data: contractData,
      value: 0n,
    });

    // Send transaction
    const hash = await walletClient.sendTransaction({
      account,
      to: GOODDOLLARADDRESS as `0x${string}`,
      data: contractData,
      gas: gasEstimate,
      value: 0n,
    });

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return NextResponse.json({
      success: true,
      transactionHash: receipt.transactionHash,
      amount: reward,
      recipient: wallet,
    });
  } catch (error) {
    console.error("Token transfer error:", error);

    let errorMessage = "Failed to transfer tokens";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
