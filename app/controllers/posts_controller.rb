class PostsController < ApplicationController
  def index 
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checkd
    post = Post.find(params[:id])
    if post.checkd
      post.update(checkd: false)
    else
      post.update(checkd: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
