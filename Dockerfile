FROM ruby:2.5.5

# Install dependencies

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y libxml2-dev libxslt1-dev
RUN apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y yarn
RUN gem install bundler

# Set work directory

ENV APP_HOME /jobtriage
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install GEMS

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME

# Build React client
RUN yarn postinstall

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]