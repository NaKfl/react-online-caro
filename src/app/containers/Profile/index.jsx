import { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import Title from 'app/components/Title';
import Input from 'app/components/Input';
import saga from './saga';
import Table from './Table';
import { Row, Col, Avatar } from 'antd';
import Form from 'app/components/Form';
import useHooks from './hooks';
import { USER_STATUS } from 'utils/constants';
import classifyRank from 'utils/classifyRank';
import moment from 'moment';
import {
  StyledProfile,
  StyledInfo,
  StyledUserItem,
  StyledUserStatus,
  StyledTextStatus,
  StyledAvatar,
  StyledBadge,
  StyledName,
  StyledPart,
  StyledListGame,
} from './styles';
export const Profile = memo(({ ...rest }) => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, states } = useHooks();
  const { listGame } = states;
  const { userInfo } = selectors;
  const {
    email,
    totalMatches,
    winMatches,
    status,
    name,
    avatar,
    point,
    createdAt,
  } = userInfo;
  return (
    <StyledProfile>
      <StyledInfo>
        <Form className="profile-form" requiredMark={false} layout="vertical">
          <Row className="mb-4">
            <StyledUserItem {...rest}>
              <StyledPart>
                <StyledAvatar>
                  <Avatar size={80} src={avatar} />
                  {status && <StyledBadge color={USER_STATUS[status].color} />}
                </StyledAvatar>
                <StyledUserStatus>
                  <StyledName>{name}</StyledName>
                  {status && (
                    <StyledTextStatus color={USER_STATUS[status].color}>
                      {USER_STATUS[status].title}
                    </StyledTextStatus>
                  )}
                </StyledUserStatus>
              </StyledPart>
            </StyledUserItem>
          </Row>

          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Form.Item label="Name">
                <Input disabled value={name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input disabled value={email} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Rank">
                <Input value={classifyRank(point)} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Point">
                <Input disabled value={point} />
              </Form.Item>
            </Col>
            <Col span={12} className="final-input">
              <Form.Item label="Total matches">
                <Input
                  value={`${totalMatches} (Win rate: ${Math.round(
                    (winMatches / totalMatches) * 100,
                    0,
                  )}%)`}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12} className="final-input">
              <Form.Item label="Registration Date">
                <Input
                  disabled
                  value={moment(createdAt).format('YYYY-MM-DD')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyledInfo>
      <StyledListGame>
        <Title level={4}>List of Game</Title>
        <Table dataSource={listGame} />
      </StyledListGame>
    </StyledProfile>
  );
});
export default Profile;
