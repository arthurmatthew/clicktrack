import { CircularButton } from '../core/CircularButton';

interface ICustomTimeSignatureRow {
  increase: () => void;
  decrease: () => void;
  number: number;
}

export const CustomTimeSignatureRow = ({
  increase,
  decrease,
  number,
}: ICustomTimeSignatureRow) => {
  return (
    <div className="flex items-center gap-2">
      <CircularButton onClick={decrease}>
        <i className="bi-dash leading-[0]" />
      </CircularButton>
      <h1 className="w-7 text-center leading-[0] sm:w-14">{number}</h1>
      <CircularButton onClick={increase}>
        <i className="bi-plus leading-[0]" />
      </CircularButton>
    </div>
  );
};
