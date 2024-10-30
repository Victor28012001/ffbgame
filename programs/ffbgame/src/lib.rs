use anchor_lang::prelude::*;

declare_id!("4m9P77ky6Lp77vviHovJ6ywKSjMiwXrH8vUyux4vup7P");

#[program]
pub mod ffbgame {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
