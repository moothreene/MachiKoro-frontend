function Money({
  size,
  amount,
  zIndex,
}: {
  size: number;
  amount: number;
  zIndex: string | number;
}) {
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
        width: size * 4,
        height: size * 4,
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
          width: size * 3,
          height: size * 3,
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
            width: size * 2.5,
            height: size * 2.5,
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
              WebkitUserSelect: 'none',
              fontSize: size * 1.5,
              color: 'white',
              fontFamily: 'Preahvihear',
            }}
          >
            {Math.abs(amount)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Money;
