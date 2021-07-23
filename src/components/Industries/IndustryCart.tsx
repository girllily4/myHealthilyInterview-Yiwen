import React, { useEffect } from 'react';
import { Industry } from '../../types';
import { IndustriesRetureType } from '../hooks/Industries';
import { useStyles } from './IndustryTable.styles';

type Props = {
  industryReturnType: IndustriesRetureType;
};

const IndustryCart: React.FC<Props> = (props) => {
  const [displayedCart, setDisplayedCart] = React.useState<Industry[]>();
  const industryReturnType = props.industryReturnType;
  const { industryCart, deleteFromCart } = industryReturnType;

  const classes = useStyles();

  useEffect(() => {
    setDisplayedCart(industryCart);
    console.log('industry cart component', industryCart);
  }, [industryCart]);

  const handleIndustryDelete = React.useCallback(
    (mem: Industry) => {
      deleteFromCart(mem);
    },
    [deleteFromCart]
  );

  return (
    <React.Fragment>
      <h3>Cart</h3>
      {displayedCart?.map((industry: Industry, index: number) => {
        return (
          <li
            key={index}
            className={classes.cartElement}
            onClick={() => handleIndustryDelete(industry)}
          >
            {`${industry.sic_code}, ${industry.title}`}.
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default IndustryCart;
