import {  useState } from 'react'
import {
  AvatarConfig,
  AvatarCreatorViewer,
  EditorConfig,
} from '@readyplayerme/rpm-react-sdk'
// import {
//   Connection,
//   PublicKey,
//   clusterApiUrl,
//   Keypair,
// } from '@solana/web3.js';
// import { Program, AnchorProvider } from '@project-serum/anchor';
// import idl from './idl/my_nft_project.json'; // Import your program's IDL
// import { WalletAdapter } from '@solana/wallet-adapter-base';
// import { TOKEN_PROGRAM_ID, createMint, mintTo } from '@solana/spl-token';
// import { getReadyPlayerMeAvatarUrl } from './ReadyPlayerMeUtils'
// import { Wallet } from '@coral-xyz/anchor';

const MintCharacterComponent = () => {
  // const MintCharacterComponent: React.FC<{ wallet: Wallet }> = ({ wallet }) => {
  const [mintStatus, setMintStatus] = useState<string>('') // Status of minting
  const [, setIsLoading] = useState<boolean>(false)

  // Initialize connection to Solana Devnet
  //   const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  //   const programId = new PublicKey('YourProgramIdHere'); // Replace with your program ID
  //   const provider = new AnchorProvider(connection, wallet, {});
  //   const program = new Program(idl, programId, provider);
  const [, setAvatarUrl] = useState<string | null>(null)

  // useEffect to run the async function once when the component mounts
  //   useEffect(() => {
  //     const fetchAvatar = async () => {
  //       const url = await getReadyPlayerMeAvatarUrl()
  //       setAvatarUrl(url) // Set the fetched avatar URL into state
  //     }

  //     fetchAvatar()
  //   }, [mintStatus])

  const mintCharacterAsNFT = async (): Promise<void> => {
    console.log('ok')
    setIsLoading(true)
    try {
      // Get the user's Ready Player Me avatar URL
      //   const avatarUrl: string = await getReadyPlayerMeAvatarUrl()

      // Create a new mint account
      //   const mint = await createMint(connection, wallet.publicKey, wallet.publicKey, null, 0);

      // Mint the NFT using the Anchor program
      //   await program.rpc.mintNft(avatarUrl, {
      //     accounts: {
      //       user: wallet.publicKey,
      //       mint: mint,
      //       tokenProgram: TOKEN_PROGRAM_ID,
      //       rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      //     },
      //     signers: [],
      //   });

      setMintStatus('NFT minted successfully!')
    } catch (error) {
      console.error('Error minting NFT:', error)
      setMintStatus('Error minting NFT. Check console for details.')
    }
    setIsLoading(false)
  }

  const editorConfig: EditorConfig = {
    clearCache: true,
    bodyType: 'halfbody',
    quickStart: false,
    language: 'en',
  }

  const avatarConfig: AvatarConfig = {
    meshLod: 2,
    textureAtlas: 512,
    morphTargets: ['ARKit'], // expecting an array of strings
    pose: 'T',
  }

  // Callback function when avatar is exported
  const handleOnAvatarExported = (url: string) => {
    console.log('Avatar URL:', url)
    setAvatarUrl(url) // Save the avatar URL
  }

  // Callback when user is set
  const handleOnUserSet = (userId: string) => {
    console.log('User ID:', userId)
  }
  return (
    <section className='w-full h-full bg-bodyBg'>
      <main className='w-full h-full lg:py-24 md:py-24 py-20 md:px-6 px-3 flex flex-col items-center gap-4'>
        <div className='flex justify-between w-full'>
          <h2 className='text-2xl text-myGreen'>Mint Character as NFT</h2>
          <button
            onClick={mintCharacterAsNFT}
            className='bg-myGreen px-4 py-2 rounded absolute bottom-4 right-6'
          >
            {/* <button onClick={mintCharacterAsNFT} disabled={isLoading || !wallet.connected}> */}
            {mintStatus ? 'Mint NFT' : 'Minting...'}
            {/* {isLoading ? 'Minting...' : 'Mint Character NFT'} */}
          </button>
          {/* {mintStatus && <p>{mintStatus}</p>} */}
        </div>

        <AvatarCreatorViewer
          subdomain='demo'
          onUserSet={handleOnUserSet}
          onAvatarExported={handleOnAvatarExported}
          editorConfig={editorConfig}
          avatarConfig={avatarConfig}
        />
      </main>
    </section>
  )
}

export default MintCharacterComponent
