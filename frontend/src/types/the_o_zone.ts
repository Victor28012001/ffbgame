/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/the_o_zone.json`.
 */
export type TheOZone = {
  name: "theOZone",
  version: "0.1.0",
  metadata: {
    address: "6pHK1Nc8Tkkxwh8ySG6jtVd74HHtJxdvjCav8EeWbbNZ";
  };
  instructions: [
    {
      name: "createGreeting";
      discriminator: [230, 141, 114, 135, 35, 122, 88, 117];
      accounts: [
        {
          name: "greetingAccount";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "incrementGreeting";
      discriminator: [58, 180, 32, 32, 96, 80, 100, 213];
      accounts: [
        {
          name: "greetingAccount";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "greetingAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "counter";
            type: "u64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "greetingAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "counter";
            type: "u64";
          }
        ];
      };
    }
  ];
};
