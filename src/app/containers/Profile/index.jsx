import { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import Title from 'app/components/Title';
import Input from 'app/components/Input';
import saga from './saga';
import Table from './Table';
import { Row, Col, Avatar, Button } from 'antd';
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
} from './styles';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
export const Profile = memo(props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handles } = useHooks();
  const { gameList } = selectors;
  const { handleBlock } = handles;
  const { ...rest } = props;
  const user = getUserFromStorage();
  user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');
  const { status, name, avatar, point } = user;
  return (
    <StyledProfile>
      <StyledInfo>
        <Row>
          <Form
            className="profile-form"
            requiredMark={false}
            initialValues={user}
            layout="vertical"
          >
            <Row className="mb-4">
              <StyledUserItem {...rest}>
                <StyledPart>
                  <StyledAvatar>
                    <Avatar size={80} src={avatar} />
                    {status && (
                      <StyledBadge color={USER_STATUS[status].color} />
                    )}
                    {/* <StyledBadge color={color} /> */}
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
                <Form.Item label="Name" name="name">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Rank">
                  <Input value={classifyRank(point)} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Point" name="point">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12} className="final-input">
                <Form.Item label="Total matches" name="total-matches">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12} className="final-input">
                <Form.Item label="Registration Date" name="createdAt">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </StyledInfo>
      <Title level={4}>List of Game</Title>
      {/* <Table dataSource={gameList} /> */}
    </StyledProfile>
  );
});
export default Profile;
