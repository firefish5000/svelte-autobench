/* eslint-disable camelcase */
declare class Svelte2TsxComponent<
  Props extends Record<string ,unknown> = unknown
  ,Events extends Record<string ,unknown> = unknown
  ,Slots extends Record<string ,unknown> = unknown
> {
  // The following three exist for type checking capabilities only
  // and do not exist at runtime:
  $$prop_def: Props

  $$events_def: Events

  $$slot_def: Slots

  constructor(options: {
    // ...
    props?: Props & Record<string ,unknown>
    // <-- typed as Props, Record<string, any> for the $$restProps possibility
  });

  $on<K extends keyof Events>(
    event: K ,
    handler: (e: Events[K]) => void
  ): () => void; // <-- typed
  $set(props: Partial<Props> & Record<string ,unknown>): void;
  // <-- typed, Record<string, any> for the $$restProps possibility
  // ...
}
