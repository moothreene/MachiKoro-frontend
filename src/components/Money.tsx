import { useEffect, useState } from 'react';

function Money({
  size,
  amount,
  zIndex,
}: {
  size: number;
  amount: number;
  zIndex: string | number;
}) {
  const [sizeAdjusted, setSizeAdjusted] = useState(Math.floor(size * 1.3));
  const COLOR_OUTER_SMALL = 'chocolate';
  const COLOR_MIDDLE_SMALL = 'darksalmon';
  const COLOR_OUTER_MEDIUM = 'silver';
  const COLOR_MIDDLE_MEDIUM = 'gainsboro';
  const COLOR_OUTER_LARGE = 'gold';
  const COLOR_MIDDLE_LARGE = 'yellow';
  const COLOR_OUTER_XLARGE = 'darkorchid';
  const COLOR_MIDDLE_XLARGE = 'plum';

  return (
    <div
      className="circle outer"
      style={{
        zIndex: zIndex,
        margin: 0,
        padding: 0,
        display: 'flex',
        width: sizeAdjusted * 3.25,
        height: sizeAdjusted * 3.25,
        borderRadius: '50%',
        backgroundColor:
          amount >= 100
            ? COLOR_OUTER_XLARGE
            : amount >= 10
            ? COLOR_OUTER_LARGE
            : amount >= 5
            ? COLOR_OUTER_MEDIUM
            : COLOR_OUTER_SMALL,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="circle middle"
        style={{
          margin: 0,
          padding: 0,
          display: 'flex',
          width: sizeAdjusted * 2.75,
          height: sizeAdjusted * 2.75,
          borderRadius: '50%',
          backgroundColor:
            amount >= 100
              ? COLOR_MIDDLE_XLARGE
              : amount >= 10
              ? COLOR_MIDDLE_LARGE
              : amount >= 5
              ? COLOR_MIDDLE_MEDIUM
              : COLOR_MIDDLE_SMALL,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="circle inner"
          style={{
            margin: 0,
            padding: 0,
            display: 'flex',
            width: sizeAdjusted * 2.35,
            height: sizeAdjusted * 2.35,
            borderRadius: '50%',
            backgroundColor:
              amount >= 100
                ? COLOR_OUTER_XLARGE
                : amount >= 10
                ? COLOR_OUTER_LARGE
                : amount >= 5
                ? COLOR_OUTER_MEDIUM
                : COLOR_OUTER_SMALL,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontSize: sizeAdjusted,
              color: 'white',
              fontFamily: 'Preahvihear',
            }}
          >
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Money;
