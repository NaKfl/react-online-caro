import React, { memo } from 'react';
import { StyledModalLoading } from './styles';
import Button from 'app/components/Button';
import Countdown from 'react-countdown';

const Confirm = memo(props => {
  const { visible, onCancel, handlePushToGame, matchingGame, ...rest } = props;

  return (
    <StyledModalLoading
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} visible={!matchingGame.status}>
          Cancle
        </Button>,
      ]}
      {...rest}
    >
      <h2
        className="number"
        style={{
          position: 'absolute',
          color: matchingGame.status ? 'green' : 'white',
          fontFamily: 'Helvetica Neue,Helvetica,Arial',
          fontSize: 20,
        }}
      >
        {matchingGame.status ? 'M A T C H E D' : 'M A T C H I N G'}
      </h2>
      <svg width="300" height="150" id="clackers">
        <svg>
          <path id="arc-left-up" fill="none" d="M 90 90 A 90 90 0 0 1 0 0" />
        </svg>
        <svg>
          <path
            id="arc-right-up"
            fill="none"
            d="M 100 90 A 90 90 0 0 0 190 0"
          />
        </svg>

        <circle cx="15" cy="15" r="15">
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            calcMode="linear"
            keyPoints="0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0"
            keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0"
          >
            <mpath xlink href="#arc-left-up" />
          </animateMotion>
        </circle>
        <circle cx="135" cy="105" r="15" />
        <circle cx="165" cy="105" r="15" />
        <circle cx="95" cy="15" r="15">
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            calcMode="linear"
            keyPoints="0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0"
            keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0"
          >
            <mpath xlink href="#arc-right-up" />
          </animateMotion>
        </circle>
      </svg>
      {matchingGame.status && (
        <Countdown
          date={Date.now() + 5000}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              handlePushToGame({
                roomId: matchingGame.roomId,
                password: matchingGame.password,
              });
            }
            return (
              <h2 className="number" style={{ color: 'white' }}>
                {`${seconds}`}
              </h2>
            );
          }}
        ></Countdown>
      )}

      {!matchingGame.status && (
        <Countdown
          date={Date.now() + 3599000}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (seconds % 30 === 0) {
              //Emit to join other queue
              console.log('Emit to join other queue', seconds);
            }
            return (
              <h2 className="number" style={{ color: 'white' }}>
                {`${minutes > 59 ? 0 : 59 - minutes} : `}
                {`${minutes > 59 ? 0 : 60 - seconds}`}
              </h2>
            );
          }}
        ></Countdown>
      )}
    </StyledModalLoading>
  );
});

export default Confirm;
