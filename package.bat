@color b
@set version=0.0.42
call aws ecr get-login-password --region cn-northwest-1 | docker login --username AWS --password-stdin 086115989834.dkr.ecr.cn-northwest-1.amazonaws.com.cn
call docker build -t ijingzhun/xdata-admin .
call docker tag ijingzhun/xdata-admin:latest 086115989834.dkr.ecr.cn-northwest-1.amazonaws.com.cn/ijingzhun/xdata-admin:%version%
call docker push 086115989834.dkr.ecr.cn-northwest-1.amazonaws.com.cn/ijingzhun/xdata-admin:%version% 
@cmd /k