from backend.agents.image_agent import ImageAgent

if __name__ == '__main__':
    agent = ImageAgent()
    data = agent.download_image('https://via.placeholder.com/50')
    print('download type', type(data), 'len', len(data))
    print('analysis result', agent.analyze('https://via.placeholder.com/50'))
