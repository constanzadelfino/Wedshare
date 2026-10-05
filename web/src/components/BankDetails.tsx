import { useCopy } from '../controllers/useCopy';
import { BankAccount } from '../models/Invitation';
import { CopyIcon } from './Icons';

// Datos de la cuenta bancaria con el botón "Copiar CBU" (o el alias, si no cargaron el CBU).
export function BankDetails({ bank }: { bank: BankAccount }) {
  const copy = useCopy();
  const rows = [
    ['Banco', bank.bank],
    ['Titular', bank.holder],
    ['Alias', bank.alias],
    ['CBU', bank.cbu],
  ] as const;
  const toCopy = bank.cbu
    ? { value: bank.cbu, label: 'Copiar CBU', done: 'CBU copiado' }
    : bank.alias
      ? { value: bank.alias, label: 'Copiar alias', done: 'Alias copiado' }
      : null;

  return (
    <div className="flex flex-col gap-1.5">
      {rows.map(([label, value]) =>
        value ? (
          <div key={label} className="flex justify-between gap-3 border-b border-line py-1.5 text-[15px]">
            <span className="text-muted">{label}</span>
            <span className="break-all text-right font-bold">{value}</span>
          </div>
        ) : null,
      )}
      {toCopy && (
        <div className="mt-2.5">
          <button type="button" className="btn btn-outline w-full" onClick={() => copy.copy(toCopy.value)}>
            <CopyIcon />
            {copy.copied ? toCopy.done : toCopy.label}
          </button>
          <p className="m-0 mt-2 min-h-5 text-center text-sm text-muted" aria-live="polite">
            {copy.failed ? 'No pudimos copiarlo. Podés seleccionarlo y copiarlo a mano.' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
